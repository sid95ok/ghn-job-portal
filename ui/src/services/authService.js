import { userLogin, userRegister, userUpdate } from "../redux/auth/authActions";
import store from "../redux/store";

export const handleLogin = (e, email, password) => {
    e.preventDefault();
    try {
        if (!email || !password) {
            return alert("Please Privde All Fields");
        }
        store.dispatch(userLogin({ email, password }));
    } catch (error) {
        console.log(error);
    }
};

export const handleSignUp = (e, name, email, password, city) => {
    e.preventDefault();
    try {
        store.dispatch(
            userRegister({ name, email, password, city })
        );
    } catch (error) {
        console.log(error);
    }
};

export const handleProfileUpdate = (e, name, email, password, city) => {
    e.preventDefault();
    try {
        store.dispatch(
            userUpdate({ name, email, password, city })
        );
    } catch (error) {
        console.log(error);
    }
};
