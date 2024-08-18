using System.ComponentModel.DataAnnotations;

public class UserRegistrationDTO
{
    [Required(ErrorMessage = "Поле 'Имя пользователя' обязательно для заполнения")]
    [Display(Name = "Имя пользователя")]
    [MinLength(4, ErrorMessage ="Минимальная длина имени пользователя - 4 символа!")]
    [MaxLength(16, ErrorMessage ="Максимальная длина имени пользователя - 16 символов!")]
    [RegularExpression(@"^[a-zA-Z0-9]+$", ErrorMessage = "В имени пользователя используйте только латинские буквы и арабские цифры!")]
    public string Username { get; set; }

    [Required(ErrorMessage = "Поле 'Электронная почта' обязательно для заполнения")]
    [EmailAddress(ErrorMessage = "Некорректный формат электронной почты")]
    [RegularExpression(@"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$", ErrorMessage = "Недопустимые символы в email'e")]
    [Display(Name = "Электронная почта")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Поле 'Пароль' обязательно для заполнения")]
    [MinLength(8, ErrorMessage ="Минимальная длина пароля - 8 символов!")]
    [DataType(DataType.Password)]
    [Display(Name = "Пароль")]
    public string Password { get; set; }

    [Required(ErrorMessage = "Поле 'Подтверждение пароля' обязательно для заполнения")]
    [RegularExpression(@"^(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':\\|,.<>\/?]*$", ErrorMessage = "В пароле используйте только латинские буквы, арабские цифры и специальные символы, и он должен содержать хотя бы одну заглавную букву.")]
    [Compare("Password", ErrorMessage = "Пароли не совпадают!")]
    [DataType(DataType.Password)]
    [Display(Name = "Подтверждение пароля")]
    public string PasswordConfirmation { get; set; }
}