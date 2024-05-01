'use client';

import { useParams } from 'next/navigation';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getVideo, getDetail, getCredits } from '../../../assets/api';
import Image from 'next/image';

export default function Detail() {
	const params = useParams();
	const contentsParts = params.part;
	const contentsids = params.id;
	const videoKey = [];

	const {
		data: getDetails,
		isError: detailStatus,
		error: detailError,
	} = useSuspenseQuery({
		queryKey: ['contentDetail', contentsParts, contentsids],
		queryFn: () => getDetail(contentsParts, contentsids),
	});

	const {
		data: getActor,
		isError: actorStatus,
		error: actorError,
	} = useSuspenseQuery({
		queryKey: ['creditsList', contentsParts, contentsids],
		queryFn: () => getCredits(contentsParts, contentsids),
	});

	const {
		data: getPlayVideo,
		isError: videoStatus,
		error: videoError,
	} = useSuspenseQuery({
		queryKey: ['movieVideo', contentsParts, contentsids],
		queryFn: () => getVideo(contentsParts, contentsids),
	});

	// error check

	if (detailStatus) {
		return <h1>Error {detailError.message}</h1>;
	}
	if (actorStatus) {
		return <h1>Error {actorError.message}</h1>;
	}
	if (videoStatus) {
		return <h1>Error {videoError.message}</h1>;
	}

	const content = getDetails.contentDetail;
	const actors = getActor.creditsList.cast;
	const viedos = getPlayVideo.movieVideo.results;
	viedos.map((video) => {
		if (video.type === 'Trailer' || video.type === 'Teaser') {
			return videoKey.push(video.key);
		}
	});

	return (
		<main className="flex justify-center flex-col w-screen mt-24">
			<div className="flex w-3/4 mx-auto">
				<Image
					src={`https://image.tmdb.org/t/p/original/${content.poster_path}`}
					alt="detail image"
					width={220}
					height={440}
				/>
				<div className="ml-4">
					<h1 className="font-black text-4xl drop-shadow-2xl mb-4">
						{content.title ? content.title : content.name}
					</h1>
					<div>
						{content.genres.map((genre) => {
							return (
								<>
									<span className="mr-2 mb-4">{genre.name}</span>
								</>
							);
						})}
					</div>
					<p className="text-2xl mt-3">⭐평점: {content.vote_average}</p>
					<p className="mt-4">{content.overview ? content.overview : '요약이 없습니다.'}</p>
				</div>
			</div>

			<div className="flex flex-col mx-auto mt-12 border-t-2 border-red-600 border-solid pt-10  w-3/4">
				<h1 className="font-black text-4xl drop-shadow-2xl mb-10 mx-auto">Actor</h1>
				<div className="flex justify-evenly">
					{actors.length
						? actors.map((actor, index) => {
								if (index > 5) return;
								return (
									<div key={actor.id} className="flex flex-col justify-center">
										<div className="flex justify-center">
											<Image
												src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
												alt="actor image"
												width={150}
												height={150}
												className="rounded-md"
											/>
										</div>
										<p className="text-sm text-rose-600">{actor.character}</p>
										<p className="text-lg">{actor.name}</p>
									</div>
								);
						  })
						: '배우들의 프로필이 준비되지 않았습니다.'}
				</div>
			</div>

			<div className="flex flex-col mx-auto mt-12 border-t-2 border-red-600 border-solid pt-10  w-3/4">
				<h1 className="font-black text-4xl drop-shadow-2xl mb-10 mx-auto">Trailer</h1>
				<div className="flex justify-evenly pb-10">
					{videoKey.length === 0 ? (
						<Image
							id={content.id}
							src={`https://image.tmdb.org/t/p/original/${content.backdrop_path}`}
							alt="detail-image"
							width={360}
							height={180}
						/>
					) : (
						<iframe
							width="360"
							height="180"
							src={`https://www.youtube.com/embed/${videoKey[0]}?playlist=${videoKey[0]}`}
							title="YouTube video player"
							allow="autoplay; fullscreen;"
							allowfullscreen></iframe>
					)}

					{videoKey.length === 0 ? (
						<Image
							id={content.id}
							src={`https://image.tmdb.org/t/p/original/${content.poster_path}`}
							alt="detail-image"
							width={180}
							height={360}
						/>
					) : (
						<iframe
							width="360"
							height="180"
							src={`https://www.youtube.com/embed/${videoKey[1]}?&playlist=${videoKey[1]}`}
							title="YouTube video player"
							allow="autoplay; fullscreen;"
							allowfullscreen></iframe>
					)}

					{videoKey.length === 0 ? null : (
						<iframe
							width="360"
							height="180"
							src={`https://www.youtube.com/embed/${videoKey[2]}?&playlist=${videoKey[2]}`}
							title="YouTube video player"
							allow="autoplay; fullscreen;"
							allowfullscreen></iframe>
					)}
				</div>
			</div>
		</main>
	);
}
