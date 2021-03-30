import React from 'react';
import { cmsGreetService } from '@devsoutinho/cms/services/greet'
import Text from '@devsoutinho/ui/components/foundation/Text';

const links = [
    {
        url: '#youtube',
        text: 'YouTube',
        description: '',
    },
    {
        url: '#comunidade',
        text: 'Comunidade: Squad do DevSoutinho',
        description: '',
    },
    {
        url: '#lojinha',
        text: 'Lojinha',
        description: '',
    },
    {
        url: '#contribuicoes',
        text: 'Log de Contribuições com a Comunidade',
        description: 'Aqui tem uma lista com todas as contribuições que eu fiz desde o meu primeiro post!',
    },
]

export default function HomeScreen() {
    const { data } = cmsGreetService().useClient();

    return (
        <main>
            <Text as="h1">Mario Souto</Text>
            
            <img src="https://unavatar.now.sh/github/omariosouto" />

            <div>
                {JSON.stringify(data)}
            </div>


            <ul>
                {links.map(({ url, description, text }) => (
                    <li key={url}>
                        <article>
                            <a href={url}>
                                <h1>
                                    {text}
                                </h1>
                                <p>{description}</p>
                            </a>
                        </article>
                    </li>
                ))}
            </ul>
        </main>
    )
}

export async function getStaticProps() {
    const { apolloCache, data } = await cmsGreetService().useServer();

    console.log(data);

    return {
      props: {
        ...apolloCache,
      },
    }
  }