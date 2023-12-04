import React, { useState } from 'react';
import styles from './app.module.css';

const sendFormData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [errors, setErrors] = useState({});
	const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

	const validation = ({ target }) => {
		setErrors(target.value);

		let errors = {};

		if (!/^[a-zA-Z0-9._%+-]+@/.test(email)) {
			errors.email =
				'Неверный email. Введите корректный адрес электронной почты. Email должен содержать символ @';
		} else if (password.length < 5) {
			errors.password = 'Минимальная длина пароля - 5 символов';
		} else if (password !== repeatPassword) {
			errors.repeatPassword = 'Пароли не совпадают. Пароли должны совпадать!';
		}

		setErrors(errors);
		setIsSubmitDisabled(Object.keys(errors).length > 0);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		sendFormData({ email, password, repeatPassword });
	};

	return (
		<div className={styles.app}>
			<form onSubmit={onSubmit}>
				<div>
					<input
						type="text"
						name="email"
						value={email}
						placeholder="Введите ваш адрес электронный почты"
						onChange={({ target }) => setEmail(target.value)}
						onBlur={validation}
					/>
					{errors.email && <div className={styles.errors}>{errors.email}</div>}
				</div>
				<div>
					<input
						type="password"
						name="password"
						value={password}
						placeholder="Введите пароль"
						onChange={({ target }) => setPassword(target.value)}
						onBlur={validation}
					/>
					{errors.password && (
						<div className={styles.errors}>{errors.password}</div>
					)}
				</div>
				<div>
					<input
						type="password"
						name="password"
						value={repeatPassword}
						placeholder="Повторите пароль"
						onChange={({ target }) => setRepeatPassword(target.value)}
						onBlur={validation}
					/>
					{errors.repeatPassword && (
						<div className={styles.errors}>{errors.repeatPassword}</div>
					)}
				</div>
				<button type="submit" disabled={isSubmitDisabled} autoFocus>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
