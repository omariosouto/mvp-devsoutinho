import React from 'react';
import Head from 'next/head';
import Text from '@devsoutinho/ui/src/components/foundation/Text';
import Link from '../../src/components/commons/Link';

const links = [
  {
    description:
      'Tenho pela casa toda, inclusive no banheiro!!! ashuasshua vale a pena comprar pra começar seu projeto de automação residêncial, ou só para ouvir as notícias no banheiro mesmo',
    text: 'Echo Dot (3ª Geração): Smart Speaker com Alexa - Cor Preta',
    url: 'https://amzn.to/31EevzT',
  },
];

export default function LojinhaScreen(): JSX.Element {
  return (
    <main>
      <Head>
        <title>Lojinha | Mario Souto / DevSoutinho</title>
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
              {`
                Aqui vai uma série de itens que ou eu comprei, ou eu acho massa e
                cada um tem um "mini depoimento" pra ajudar você naquele momento
                "será que vale a pena comprar?" ou "pra que que eu vou usar?"
              `}
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
