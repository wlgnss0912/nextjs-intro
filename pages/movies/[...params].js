import {useRouter} from "next/router";
import Seo from "../../components/Seo";

export default function Detail({params}) {
    const [title, id] = params || [];//두 개의 element를 가지는 배열이라는 것을 안다
    console.log(useRouter());
    return (
        <div>
            <Seo title={title}/>
            <h4>{title}</h4>
        </div>
    );
}

export function getServerSideProps({params:{params}}){
    return {
        props: {
            params
        },
    }
}