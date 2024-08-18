using System.ComponentModel.DataAnnotations;

public class UserLoginDTO
{
    [Required(ErrorMessage = "Поле 'Электронная почта' обязательно для заполнения!")]
    [EmailAddress(ErrorMessage = "Некорректный формат email!")]
    [RegularExpression(@"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$", ErrorMessage = "Недопустимые символы в email'e!")]
    [Display(Name = "Электронная почта")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Поле 'Пароль' обязательно для заполнения!")]
    [DataType(DataType.Password)]
    [Display(Name = "Пароль")]
    public string Password { get; set; }
}