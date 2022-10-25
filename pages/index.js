import Seo from "../components/Seo";
import Link from "next/link";
import {useRouter} from "next/router";

export default function Home({results}) {
    const router = useRouter();
    const onClick = (id, title) => {
        router.push(`/movies/${title}/${id}`);
    }
    return (
        <div className="container">
            <Seo title="Home" />
            {results?.map((movie) => (
                <div onClick={() => onClick(movie.id, movie.original_title)} className="movie" key={movie.id}>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                    <h4>
                        <Link href={`/movies/${movie.original_title}/${movie.id}`}>
                            <a> {movie.original_title} </a>
                        </Link>
                    </h4>
                </div>
            ))}
            <style jsx>{`
                .container {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  padding: 20px;
                  gap: 20px;
                }
                .movie {
                  cursor: pointer;
                }
                .movie img {
                  max-width: 100%;
                  border-radius: 12px;
                  transition: transform 0.2s ease-in-out;
                  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
                }
                .movie:hover img {
                  transform: scale(1.05) translateY(-10px);
                }
                .movie h4 {
                  font-size: 18px;
                  text-align: center;
                }
          `}</style>
        </div>
    );
}

//여기어 어떤 코드를 쓰던 간, 이 코드들은 server에서 돌아간다.
//API 키도 여기에 사용한다면 rewrites를 사용하지 않아도 된다. => client에서는 절대 보이지 않는 영역
//무엇을 return 하든지, 결과를 props로서 해당 page에게 주게 된다.
//API에 데이터를 받아 올때까지 화면 로딩이 안된다는 것이다.
export async function getServerSideProps() {
    const {results} = await (
        await fetch(`http://localhost:3000/api/movies`)
    ).json();
    return {
        props: {
            results,
        },
    };
}