import Link from 'next/link';
import Card from 'react-bootstrap/Card';

interface BlogCardProps extends Blog {}

function BlogCard({
  title,
  content,
  author,
  createdAt,
  _id
}: BlogCardProps) {
  return (
    <Link href={`/blogs/${_id}`}>
      <Card className='w-full my-2'>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {content.slice(0, 100) + "..."}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <div className="items-center flex-wrap flex justify-between">
              <Card.Subtitle className="text-muted">By {author.name}</Card.Subtitle>
              <Card.Text className="text-muted">{new Date(createdAt).toDateString()}</Card.Text>
          </div>
        </Card.Footer>
      </Card>
    </Link>
  );
}

export default BlogCard;