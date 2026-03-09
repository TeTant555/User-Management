class CreateUserRequest {
    constructor(body) {
        this.UserName = body.UserName;
        this.PassWord = body.PassWord;
        this.Email = body.Email;
        this.FirstName = body.FirstName;
        this.LastName = body.LastName;
    }

    validate() {
        const errors = [];
        if (!this.UserName) errors.push('UserName is required');
        if (!this.PassWord) errors.push('PassWord is required');
        if (!this.Email) errors.push('Email is required');
        if (!this.FirstName) errors.push('FirstName is required');
        if (!this.LastName) errors.push('LastName is required');
        return errors;
    }
}

class UpdateUserRequest {
    constructor(body) {
        if(body.UserName !== undefined) this.UserName = body.UserName;
        if(body.PassWord !== undefined) this.PassWord = body.PassWord;
        if(body.Email !== undefined) this.Email = body.Email;
        if(body.FirstName !== undefined) this.FirstName = body.FirstName;
        if(body.LastName !== undefined) this.LastName = body.LastName;
        if(body.IsActive !== undefined) this.IsActive = body.IsActive;
    }

    validate() {
        const errors = [];
        if (Object.keys(this).length === 0) {
            errors.push('At least one field is required to update');
        }
        return errors;
    }
}

class LoginRequest {
    constructor(body) {
        this.Email = body.Email;
        this.PassWord = body.PassWord;
    }

    validate() {
        const errors = [];
        if (!this.Email) errors.push('Email is required');
        if (!this.PassWord) errors.push('PassWord is required');
        return errors;
    }
}

class GoogleLoginRequest {
    constructor(body) {
        this.idToken = body.idToken;
    }

    validate() {
        const errors = [];
        if (!this.idToken) errors.push('Google ID Token is required');
        return errors;
    }
}

module.exports = {
    CreateUserRequest,
    UpdateUserRequest,
    LoginRequest,
    GoogleLoginRequest  
};