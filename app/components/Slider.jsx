'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

register();

export default function Slider({ contents, part }) {
	const swiperElRef = useRef(null);

	useEffect(() => {
		swiperElRef.current.addEventListener('swiperprogress', (e) => {
			const [swiper, progress] = e.detail;
			console.log(progress);
		});

		swiperElRef.current.addEventListener('swiperslidechange', (e) => {
			console.log('slide changed');
		});
	}, []);

	const slidesPerView = Math.min(contents.length, 6);

	return (
		<div className="w-screen">
			<Swiper
				modules={[Navigation, Pagination, A11y]}
				ref={swiperElRef}
				loop={true}
				slidesPerView={slidesPerView}
				navigation={true}
				pagination={true}
				spaceBetween={50}>
				{contents &&
					contents.map((content) => {
						return (
							<SwiperSlide key={content.id} className="w-60">
								<Link key={content.id} href={`detail/${part}/${content.id}`} className="w-60">
									<img
										id={content.id}
										src={`https://image.tmdb.org/t/p/original/${content.poster_path}`}
										alt="Image"
										className="w-60 h-80"
									/>
								</Link>
							</SwiperSlide>
						);
					})}
			</Swiper>
		</div>
	);
}
