/* eslint-disable no-console */
import React from 'react';
import Head from 'next/head';
import Text from '@devsoutinho/ui/src/components/foundation/Text';
import Link from '../../src/components/commons/Link';
import { useMutation, gql } from '@apollo/client';
import { cmsProductsRepository } from '../../cms/infra/repository/products';

const UPDATE_PRODUCT_MUTATION = gql`
  mutation($queryId: String, $newTitle: String) {
    updateProduct(query: { _id: $queryId }, input: { title: $newTitle }) {
      _id
      title
      description
      url
    }
  }
`;

const contributionsRepository = cmsProductsRepository();

export default function StoreScreen(): JSX.Element | string {
  const [title, setTitle] = React.useState(
    'Keychron Toda loja com 10% de desconto!'
  );
  const {
    data,
    loading,
    error,
  } = contributionsRepository.getStorePageData().useHook();
  const [updateProductTitle] = useMutation(UPDATE_PRODUCT_MUTATION, {
    update(cache, { data }) {
      const updatedProduct = data?.updateProduct;

      // TODO: Fix this any and move it to a repository
      const currentProducts = cache.readQuery({
        query: contributionsRepository.getStorePageData().query,
      }) as any;

      cache.writeQuery({
        query: contributionsRepository.getStorePageData().query,
        data: {
          products: currentProducts.products.map((product) => {
            console.log(updatedProduct, product._id === updatedProduct._id);
            if (product._id === updatedProduct._id) {
              return {
                ...product,
                updatedProduct,
              };
            }
            return product;
          }),
        },
      });
    },
  });

  if (loading) return 'Carregando... :O';
  if (error) return 'Algum erro aconteceu :(';
  if (!data) return 'Sem dados :(';

  return (
    <main>
      <Head>
        <title>🛒 Lojinha | Mario Souto / DevSoutinho</title>
      </Head>

      {process.env.NODE_ENV === 'development' && (
        <div>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <button
            onClick={() => {
              console.log('Hellooo!');
              updateProductTitle({
                variables: {
                  queryId: '124d97b3-d978-412e-8f33-5cd23b281ac2',
                  newTitle: title,
                },
              });
            }}
          >
            Update Title
          </button>
        </div>
      )}

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
          {data.products.map(({ url, description, title }) => (
            <li key={url}>
              <article>
                <Link href={url}>
                  <h1>{title}</h1>
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
  const apolloCache = await contributionsRepository
    .getStorePageData()
    .getApolloCacheForNextProps();

  return {
    props: {
      ...apolloCache,
    },
  };
}
