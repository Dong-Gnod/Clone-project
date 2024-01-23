'use client';
import { useAuth } from '../store/useAuth';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection, where, getDocs, query } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function Signup() {
	const [id, setId] = useState('');
	const [pw, setPw] = useState('');
	const [pwConfirm, setPwConfirm] = useState('');
	const { user } = useAuth();
	const router = useRouter();

	const onSignup = async () => {
		if (pw !== pwConfirm) {
			window.alert('두개의 비밀번호가 다릅니다');
			return;
		}

		const storedUser = await getDocs(query(collection(firestore, 'users'), where('name', '==', id)));
		const targetUsers = [];
		storedUser.forEach((doc) => targetUsers.push(doc.data()));
		if (id === '' || pw === '') {
			alert('아이디 또는 비밀번호를 입력해주세요');
		} else if (targetUsers.length > 0) {
			window.alert('중복된 계정 정보 이름이 있습니다. 이름을 변경해주세요.');
			return;
		}

		const newUser = {
			id: uuidv4(),
			name: id,
			pw,
		};

		if (id === '' || pw === '') {
			return;
		} else {
			await addDoc(collection(firestore, 'users'), newUser);
			localStorage.setItem('user', JSON.stringify(newUser));
			signIn(newUser);
			window.alert('회원가입에 완료했습니다');
			router.push('/login');
		}
		if (user) return router.push('/main');
		router.push('/');
	};

	return (
		<main>
			<h1>영화, 시리즈 등을 무제한으로 어디서나 자유롭게 시청하세요.</h1>
			<h3>시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일 주소를 입력하세요.</h3>
			<form className="text-black" action="submit" onSubmit={onSignup}>
				<input type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
				<input type="password" placeholder="PW" value={pw} onChange={(e) => setPw(e.target.value)} />
				<input
					type="password"
					placeholder="Password Check"
					value={pwConfirm}
					onChange={(e) => setPwConfirm(e.target.value)}
				/>
				<button>시작하기</button>
			</form>
		</main>
	);
}
