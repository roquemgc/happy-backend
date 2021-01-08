import User from '../models/User'

export default {
    render(user: User){
        return {
            id: user.id,
            email: user.email,
            password: user.email,
        };
    },

    renderMany(users: User[]) {
        return users.map(user => this.render(user))
    }
};
