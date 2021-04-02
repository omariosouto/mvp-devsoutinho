import React from 'react';
import Head from 'next/head';
import { cmsGreetService } from '../cms/services/greet';
import Text from '@devsoutinho/ui/src/components/foundation/Text';
import Link from '../src/components/commons/Link';
import Datastore from 'nedb';

console.log(Datastore);

const links = [
  {
    description:
      'Vídeo novo toda sexta-feira sempre falando de um conteúdo relacionado a programação e tecnologia!',
    text: '🎬 YouTube',
    url: '/go/youtube/',
  },
  {
    description:
      'Espaço pra galera que acompanha o canal conversar, trocar experiências, dicas e muito mais!',
    text: '🎉 Comunidade: Squad do DevSoutinho',
    url: '/go/comunidade/',
  },
  {
    description:
      'Váaarios links de gadgets e "cacarecos" que eu tenho/estou com vontade de comprar e que vira e mexe aparecem nos vídeos',
    text: '🛒 Lojinha',
    url: '/lojinha',
  },
  {
    description:
      'Aqui tem uma lista com todas as contribuições que eu fiz desde o meu primeiro post!',
    text: '✨ Log de Contribuições',
    url: '/contribuicoes',
  },
];

export default function HomeScreen(): JSX.Element {
  return (
    <main>
      <Head>
        <title>Mario Souto / DevSoutinho</title>
      </Head>

      <div className="container">
        <header className="headerCard">
          <Link href="/">
            <img
              className="avatar rounded center-margin"
              src="https://unavatar.now.sh/github/omariosouto"
              alt="Imagem de perfil do Mario Souto"
            />
          </Link>
          <Text
            className="title"
            as="h1"
            textAlign="center"
            style={{
              lineHeight: 1,
              marginBottom: 0,
              color: 'var(--colors_primary_main_color)',
            }}
          >
            Mario Souto
          </Text>
          <Text as="h2" textAlign="center" style={{ marginTop: 0 }}>
            Dev Soutinho
          </Text>
          <div className="headerCard__divider">
            <Text as="p">
              Sempre no 220v, atrás de um filme/rolê e codando desafios em JS.
              Adoro trabalhar com a web e compartilhar sobre isso na{' '}
              <Link href="https://alura.com.br/">Alura</Link>,{' '}
              <Link href="https://nubank.com.br/">Nubank</Link> e no meu canal
              do{' '}
              <Link href="https://youtube.com/DevSoutinho">
                YouTube DevSoutinho
              </Link>
            </Text>
          </div>
        </header>

        <ul className="blocks-container">
          {links.map(({ url, description, text }) => (
            <li key={url}>
              <article>
                <Link href={url}>
                  <h1>{text}</h1>
                  <p>{description}</p>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export async function getStaticProps(): Promise<{ props: any }> {
  const { apolloCache } = await cmsGreetService().useServer();

  return {
    props: {
      ...apolloCache,
    },
  };
}
