import React from 'react';
import { cmsGreetService } from '@devsoutinho/cms/services/greet';
import Text from '@devsoutinho/ui/src/components/foundation/Text';

const links = [
  {
    description: '',
    text: 'YouTube',
    url: '#youtube',
  },
  {
    description: '',
    text: 'Comunidade: Squad do DevSoutinho',
    url: '#comunidade',
  },
  {
    description: '',
    text: 'Lojinha',
    url: '#lojinha',
  },
  {
    description:
      'Aqui tem uma lista com todas as contribuições que eu fiz desde o meu primeiro post!',
    text: 'Log de Contribuições com a Comunidade',
    url: '#contribuicoes',
  },
];

export default function HomeScreen(): JSX.Element {
  const { data } = cmsGreetService().useClient();

  return (
    <main>
      <Text as="h1">Mario Souto</Text>

      <img src="https://unavatar.now.sh/github/omariosouto" />

      <div>{JSON.stringify(data)}</div>

      <ul>
        {links.map(({ url, description, text }) => (
          <li key={url}>
            <article>
              <a href={url}>
                <h1>{text}</h1>
                <p>{description}</p>
              </a>
            </article>
          </li>
        ))}
      </ul>
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
