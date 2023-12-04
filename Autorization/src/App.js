import React from 'react';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
import styles from './app.module.css';

const sendFormData = (formData) => {
	console.log(formData);
};

const schema = yup.object().shape({
	email: yup
		.string()
		.matches(
			/^[a-zA-Z0-9._%+-]+@/,
			'Неверный email. Введите корректный адрес электронной почты. Email должен содержать символ @',
		)
		.required('Обязательное поле'),
	password: yup
		.string()
		.min(5, 'Минимальная длина пароля - 5 символов')
		.required('Обязательное поле'),
	repeatPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
		.required('Обязательное поле'),
});

export const App = () => {
	const { control, handleSubmit, setError, formState } = useForm();

	const onSubmit = (data) => {
		schema
			.validate(data, { abortEarly: false })
			.then(() => {
				// Все в порядке, можно отправлять данные
				sendFormData(data);
			})
			.catch((validationErrors) => {
				// Устанавливаем ошибки вручную для каждого поля
				validationErrors.inner.forEach((error) => {
					setError(error.path, {
						type: 'manual',
						message: error.message,
					});
				});
			});
	};

	return (
		<div className={styles.app}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label>Email:</label>
					<Controller
						control={control}
						name="email"
						render={({ field }) => (
							<>
								<input
									type="text"
									placeholder="Введите ваш адрес электронный почты"
									{...field}
								/>
								{formState.errors.email && (
									<div className={styles.errors}>
										{formState.errors.email.message}
									</div>
								)}
							</>
						)}
					/>
				</div>
				<div>
					<label>Password:</label>
					<Controller
						control={control}
						name="password"
						render={({ field }) => (
							<>
								<input
									type="password"
									placeholder="Введите пароль"
									{...field}
								/>
								{formState.errors.password && (
									<div className={styles.errors}>
										{formState.errors.password.message}
									</div>
								)}
							</>
						)}
					/>
				</div>
				<div>
					<label>Repeat Password:</label>
					<Controller
						control={control}
						name="repeatPassword"
						render={({ field }) => (
							<>
								<input
									type="password"
									placeholder="Повторите пароль"
									{...field}
								/>
								{formState.errors.repeatPassword && (
									<div className={styles.errors}>
										{formState.errors.repeatPassword.message}
									</div>
								)}
							</>
						)}
					/>
				</div>
				<button type="submit" disabled={formState.isSubmitting} autoFocus>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
