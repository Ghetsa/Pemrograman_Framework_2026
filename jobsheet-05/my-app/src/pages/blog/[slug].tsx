import { useRouter } from "next/router";

const HalamanBlog = () => {
  // const Router = useRouter();
  // console.log(Router);

  const { query } = useRouter();

  return (
    <div>
      <h1>Halaman Blog</h1>
      <p>Nilai Slug: {query.slug}</p>
    </div>
  );
};

export default HalamanBlog;