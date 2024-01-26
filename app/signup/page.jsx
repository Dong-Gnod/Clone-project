'use client';
import { useAuth } from '../store/useAuth';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { firestore } from '../../firebase';
import { addDoc, collection, where, getDocs, query } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function Signup() {
	const [id, setId] = useState('');
	const [pw, setPw] = useState('');
	const [pwConfirm, setPwConfirm] = useState('');
	const { user, signIn } = useAuth();
	const router = useRouter();

	return (
		<main className="flex items-center justify-center flex-col w-screeen h-screen font-RobotoMono bg-main">
			<button
				className="bg-red-600 hover:bg-opacity-25 text-white p-2 absolute top-5 right-5"
				onClick={() => {
					router.back();
				}}>
				로그인
			</button>
			<div className="flex flex-col bg-black bg-opacity-75 p-9 rounded-md w-96 mx-auto ">
				<h1 className="text-center m-5 text-white">회원가입</h1>
				<form className="relative items-center justify-center text-black">
					<div className="text-center mb-3">
						<input
							className="rounded-md p-2 w-full"
							type="text"
							placeholder="ID"
							value={id}
							onChange={(e) => setId(e.target.value)}
						/>
					</div>
					<div className="text-center mb-3">
						<input
							className="rounded-md p-2 w-full"
							type="password"
							placeholder="Password"
							value={pw}
							onChange={(e) => setPw(e.target.value)}
						/>
					</div>
					<div className="text-center mb-3">
						<input
							className="rounded-md p-2 w-full"
							type="password"
							placeholder="Password Check"
							value={pwConfirm}
							onChange={(e) => setPwConfirm(e.target.value)}
						/>
					</div>
					<button
						className="w-full bg-red-600 hover:bg-opacity-25 text-white p-2"
						onClick={async (e) => {
							e.preventDefault();
							if (pw !== pwConfirm) {
								window.alert('두개의 비밀번호가 다릅니다');
								return;
							}

							const storedUser = await getDocs(
								query(collection(firestore, 'users'), where('name', '==', id))
							);
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
								router.push('/');
							}
							if (user) return router.push('/main');
							router.push('/');
						}}>
						시작하기
					</button>
				</form>
			</div>
		</main>
	);
}
