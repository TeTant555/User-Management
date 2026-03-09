class UserResponse {
    constructor(user) {
        this.UserId = user.UserId;
        this.UserName = user.UserName;
        this.Email = user.Email;
        this.FirstName = user.FirstName;
        this.LastName = user.LastName;
        this.IsActive = user.IsActive;
        this.CreatedAt = user.CreatedAt;
        this.LastLogin = user.LastLogin;
    }
}

class AuthResponse {
    constructor(user, token) {
        this.user = new UserResponse(user);
        this.token = token;
    }
}

class DeleteResponse {
    constructor(id) {
        this.id = id;
    }
}

module.exports = {
    UserResponse,
    AuthResponse,
    DeleteResponse
}