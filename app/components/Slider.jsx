'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

register();

export default function Slider({ contents, part }) {
	const swiperElRef = useRef(null);
	console.log(contents);

	useEffect(() => {
		swiperElRef.current.addEventListener('swiperprogress', (e) => {
			const [swiper, progress] = e.detail;
			console.log(progress);
		});

		swiperElRef.current.addEventListener('swiperslidechange', (e) => {
			console.log('slide changed');
		});
	}, []);

	return (
		<div className="w-screen">
			<Swiper
				modules={[Navigation, Pagination, A11y]}
				ref={swiperElRef}
				loop={true}
				slidesPerView={6}
				navigation={true}
				pagination={true}
				spaceBetween={50}>
				{!contents
					? null
					: contents.map((content) => {
							return (
								<SwiperSlide key={content.id}>
									<Link key={content.id} href={`detail/${part}/${content.id}`}>
										<Image
											id={content.id}
											src={`https://image.tmdb.org/t/p/original/${content.poster_path}`}
											alt="Image"
											width={240}
											height={360}
										/>
									</Link>
								</SwiperSlide>
							);
					  })}
			</Swiper>
		</div>
	);
}
