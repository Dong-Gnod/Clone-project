'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getVideo, getDetail, getCredits } from '../../../assets/api';
import Image from 'next/image';
import Loading from '../../../components/Loading';

interface Video {
	key: string;
	type: string;
}
interface Genre {
	id: string;
	name: string;
}
interface Actor {
	id: string;
	profile_path: string;
	character: string;
	name: string;
}

export default function Detail() {
	const params = useParams();
	const part = params.part;
	const id = params.id;
	const videoKey: string[] = [];

	const {
		data: getDetails,
		isLoading: detailsLoading,
		isError: detailStatus,
		error: detailError,
	} = useQuery({
		queryKey: ['contentDetail', part, id],
		queryFn: () => getDetail(part, id),
	});

	const {
		data: getActor,
		isLoading: actorLoading,
		isError: actorStatus,
		error: actorError,
	} = useQuery({
		queryKey: ['creditsList', part, id],
		queryFn: () => getCredits(part, id),
	});

	const {
		data: getPlayVideo,
		isLoading: videoLoading,
		isError: videoStatus,
		error: videoError,
	} = useQuery({
		queryKey: ['movieVideo', part, id],
		queryFn: () => getVideo({ part, id }),
	});
	if (detailsLoading || actorLoading || videoLoading) {
		return <Loading />;
	}
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

	const content = getDetails?.contentDetail;
	const actors = getActor?.creditsList.cast;
	const viedos = getPlayVideo?.movieVideo.results;
	viedos?.map((video: Video) => {
		if (video.type === 'Trailer' || video.type === 'Teaser') {
			return videoKey.push(video.key);
		}
	});

	return (
		<div className="flex justify-center flex-col w-screen mt-24">
			<div className="flex w-3/4 mx-auto">
				{!content.poster_path ? (
					<div className="w-56 h-96 flex justify-center items-center bg-slate-400">
						<h1>No Image</h1>
					</div>
				) : (
					<Image
						src={`https://image.tmdb.org/t/p/original/${content.poster_path}`}
						alt="detail image"
						width={220}
						height={440}
					/>
				)}

				<div className="ml-4">
					<h1 className="font-black text-4xl drop-shadow-2xl mb-4">
						{content.title ? content.title : content.name}
					</h1>
					<div>
						{content.genres?.map((genre: Genre) => {
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
					{actors?.length
						? actors.map((actor: Actor, index: number) => {
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
							allowFullScreen></iframe>
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
							allowFullScreen></iframe>
					)}

					{videoKey.length === 0 ? null : (
						<iframe
							width="360"
							height="180"
							src={`https://www.youtube.com/embed/${videoKey[2]}?&playlist=${videoKey[2]}`}
							title="YouTube video player"
							allow="autoplay; fullscreen;"
							allowFullScreen></iframe>
					)}
				</div>
			</div>
		</div>
	);
}
