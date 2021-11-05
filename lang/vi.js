export const transValidation = {
    email_incorrect: "Email phải có dạng name123@gmail.com",
    gender_incorrect: "Vui lòng chọn lại",
    password_incorrect: "Phải chứa ít nhất 8 kí tự bao gồm chữ thường,chữ hoa, số và kí tự đặc biệt ",
    password_confirmation_incorrect: "Nhập lại mật khẩu đã nhập ở trên!"
};

export const transErrors = {
    account_in_use: "Email này đã được sử dụng.",
    account_removed: "Tài khoản đã bị xóa khỏi hệ thống",
    account_not_active: "Email này đã được đăng kí nhưng chưa active tài khoản,vui lòng kiểm tra email"
};

export const transSuccess = {
    userCreated: (userEmail) =>{
        return `Tài khoản <strong>${userEmail}</strong> đã được tạo,vui lòng kiểm tra email để active tài khoản trước khi đăng nhập. ` 
    }
};
