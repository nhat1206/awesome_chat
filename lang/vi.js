export const transValidation = {
    email_incorrect: "Email phải có dạng name123@gmail.com",
    gender_incorrect: "Vui lòng chọn lại",
    password_incorrect: "Phải chứa ít nhất 8 kí tự bao gồm chữ thường,chữ hoa, số và kí tự đặc biệt ",
    password_confirmation_incorrect: "Nhập lại mật khẩu đã nhập ở trên!"
};

export const transErrors = {
    account_in_use: "Email này đã được sử dụng.",
    account_removed: "Tài khoản đã bị xóa khỏi hệ thống",
    account_not_active: "Email này đã được đăng kí nhưng chưa active tài khoản,vui lòng kiểm tra email",
    token_undifined: "Token không tồn tại"
};

export const transSuccess = {
    userCreated: (userEmail) =>{
        return `Tài khoản <strong>${userEmail}</strong> đã được tạo,vui lòng kiểm tra email để active tài khoản trước khi đăng nhập. ` 
    },
    account_activated: "Kích hoạt tài khoản thành công ,bạn đã có thể đăng nhập vào ứng dụng."
};

export const transMail = {
    subject: "Awesome chat: Xác nhận kích hoạt tài khoản.",
    template: (linkVerify) =>{
        return `
            <h2>Bạn nhận được email này vì đã dăng ký tài khoản trên ứng dụng Awssome chat.</h2>
            <h3>Vui lòng click vào link bên dưới để xác nhận tài khoản.</h3>
            <h3><a href="${linkVerify}" target="blank">${linkVerify}</a></h3>
            <h4>Nếu thấy email này là nhầm lẫn,hãy bỏ qua nó.</h4>
        `;
    },
    send_fail: "Có lỗi trong quá trình gửi email,vui lòng liên hệ với bộ phận hỗ trợ."
};
