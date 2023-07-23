import Card from 'react-bootstrap/Card';

function BlogCard() {
  return (
    <Card className='w-full my-2'>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <div className="items-center flex-wrap flex justify-between">
            <Card.Subtitle className="text-muted">Card Subtitle</Card.Subtitle>
            <Card.Text className="text-muted">10:51 AM 17-7-2023</Card.Text>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default BlogCard;