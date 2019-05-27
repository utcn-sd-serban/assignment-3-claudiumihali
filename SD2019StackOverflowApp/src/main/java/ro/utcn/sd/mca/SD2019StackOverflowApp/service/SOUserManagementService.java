package ro.utcn.sd.mca.SD2019StackOverflowApp.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.utcn.sd.mca.SD2019StackOverflowApp.entity.SOUser;
import ro.utcn.sd.mca.SD2019StackOverflowApp.persistence.RepositoryFactory;
import ro.utcn.sd.mca.SD2019StackOverflowApp.persistence.Specification;
import ro.utcn.sd.mca.SD2019StackOverflowApp.persistence.SpecificationFactory;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SOUserManagementService implements UserDetailsService {
    private final RepositoryFactory repositoryFactory;
    private final SpecificationFactory specificationFactory;

    @Transactional
    public Optional<SOUser> addUser(String username, String password) {
        Specification<SOUser> su = specificationFactory.createFindSOUserByUsername(username);
        List<SOUser> lu = repositoryFactory.createSOUserRepository().query(su);
        if (!lu.isEmpty()) {
            return Optional.empty();
        } else {
            return Optional.of(repositoryFactory.createSOUserRepository().save(new SOUser(null, username, password)));
        }
    }

    @Transactional
    public Optional<SOUser> verifyUserCredentials(String username, String password) {
        Specification<SOUser> su = specificationFactory.createVerifySOUserCredentials(username, password);
        List<SOUser> lu = repositoryFactory.createSOUserRepository().query(su);
        if (lu.isEmpty()) {
            return Optional.empty();
        } else {
            return Optional.of(lu.get(0));
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Specification<SOUser> su = specificationFactory.createFindSOUserByUsername(username);
        List<SOUser> lu = repositoryFactory.createSOUserRepository().query(su);
        if (lu.isEmpty()) {
            throw new UsernameNotFoundException("Username not found!");
        }
        SOUser sOUser = lu.get(0);
        return new User(sOUser.getUsername(), sOUser.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
    }

    @Transactional
    public SOUser loadCurrentSOUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Specification<SOUser> su = specificationFactory.createFindSOUserByUsername(username);
        List<SOUser> lu = repositoryFactory.createSOUserRepository().query(su);
        return lu.get(0);
    }
}
