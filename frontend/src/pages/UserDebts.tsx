import { BookContainer } from '../components/BookContainer/BookContainer';
import { BookList } from '../components/BookList/BookList';
import { BookData } from '../types';

export default function UserDebtsPage() {
  const bookMockData: Array<BookData> = [
    {
      image:
        'https://editorialcirculorojo.com/wp-content/uploads/publicaciones/fundamentos-de-la-programacion-en-java-estructuras-de-control-e-introduccion-a-la-programacion-orientada-a-objetos/fundamentos-de-programacion-en-java-1.gif',
      title: 'Fundamentos de la programacion',
      devolutionDate: new Date(),
    },
    {
      image:
        'https://editorialcirculorojo.com/wp-content/uploads/publicaciones/fundamentos-de-la-programacion-en-java-estructuras-de-control-e-introduccion-a-la-programacion-orientada-a-objetos/fundamentos-de-programacion-en-java-1.gif',
      title: 'Fundamentos de la programacion',
      devolutionDate: new Date(),
    },
    {
      image:
        'https://editorialcirculorojo.com/wp-content/uploads/publicaciones/fundamentos-de-la-programacion-en-java-estructuras-de-control-e-introduccion-a-la-programacion-orientada-a-objetos/fundamentos-de-programacion-en-java-1.gif',
      title: 'Fundamentos de la programacion',
      devolutionDate: new Date(),
    },
    {
      image:
        'https://editorialcirculorojo.com/wp-content/uploads/publicaciones/fundamentos-de-la-programacion-en-java-estructuras-de-control-e-introduccion-a-la-programacion-orientada-a-objetos/fundamentos-de-programacion-en-java-1.gif',
      title: 'Fundamentos de la programacion',
      devolutionDate: new Date(),
    },
    {
      image:
        'https://editorialcirculorojo.com/wp-content/uploads/publicaciones/fundamentos-de-la-programacion-en-java-estructuras-de-control-e-introduccion-a-la-programacion-orientada-a-objetos/fundamentos-de-programacion-en-java-1.gif',
      title: 'Fundamentos de la programacion',
      devolutionDate: new Date(),
    },
  ];
  return (
    <BookList>
      {bookMockData.map((book: BookData, index) => (
        <BookContainer key={index} {...book} />
      ))}
    </BookList>
  );
}
