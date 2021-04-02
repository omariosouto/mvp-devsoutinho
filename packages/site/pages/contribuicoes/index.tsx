import React from 'react';
import Head from 'next/head';
import Text from '@devsoutinho/ui/src/components/foundation/Text';
import Link from '../../src/components/commons/Link';
import { cmsContributionsService } from '../../cms/services/contributions';

export default function LojinhaScreen(): JSX.Element {
  const { data } = cmsContributionsService().useClient();

  return (
    <main>
      <Head>
        <title>⚠️✨ Contribuições | Mario Souto / DevSoutinho</title>
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
                ⚠️ Aqui a ideia é ter uma lista com todas as contribuições que eu vim fazendo ao
                longo dos últimos anos, por hora ta WIP, mas vai sair ⚠️
              `}
            </Text>
          </div>
        </header>

        <ul className="blocks-container">
          {data.contributions.map(({ url, name }) => (
            <li key={url}>
              <article>
                <Link href={url}>
                  <h1>{name}!</h1>
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
  const { apolloCache } = await cmsContributionsService().useServer();

  return {
    props: {
      ...apolloCache,
    },
  };
}
