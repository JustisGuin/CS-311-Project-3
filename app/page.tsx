
import { prisma } from '@/lib/primsa';
import Link from 'next/link';

const Home = async () => {
  const posts = await prisma.ingredient.findMany()

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <h2>Home</h2>

      <ul className="flex flex-col gap-y-2">
        {posts.map((post) => (
          <li key={post.id} className="flex items-center gap-x-4">
            <div>{post.name}</div>
            <div>
              <Link href={`/generateRecipe/${post.id}`}>Go To</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;