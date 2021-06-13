import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Text from '@devsoutinho/ui/src/components/foundation/Text';
import Link from '../src/components/commons/Link';

const FormWrapper = styled.div`
  margin: 0 auto;
  max-width: 300px;

  .inputField {
    font-size: 1.125rem;
    width: 100%;
    outline: 0;
    padding: 15px;
    border-radius: 7px;
    display: block;
    border: 1px solid
      ${({ theme }) => theme.colors.background.main.contrastColor};
    box-shadow: ${({ theme }) =>
        `${theme.colors.background.main.contrastColor}25`}
      0px 2px 10px;
    color: inherit;
    text-decoration: none;
    transition: color 0.1s, background-color 0.1s, box-shadow 0.3s;
    margin-bottom: 15px;
    &:hover,
    &:focus {
      opacity: 1;
      border-color: ${({ theme }) => theme.colors.primary.main.color}ba;
      color: ${({ theme }) => theme.colors.primary.main.color};
      box-shadow: ${({ theme }) =>
          `${theme.colors.background.main.contrastColor}20`}
        0px 2px 10px 5px;
    }
  }
  button {
    cursor: pointer;
    font-size: 1.125rem;
    width: 100%;
    border: none;
    padding: 15px;
    border-radius: 7px;
    background-color: ${({ theme }) => theme.colors.primary.main.color};
    border: 1px solid ${({ theme }) => theme.colors.primary.main.color};
    color: ${({ theme }) => theme.colors.primary.main.contrastColor};
    font-weight: bold;
    transition: color 0.1s, background-color 0.1s, box-shadow 0.3s;
    margin-bottom: 15px;
    &:hover,
    &:focus {
      opacity: 1;
      border: 1px solid ${({ theme }) => theme.colors.primary.main.color};
      background-color: ${({ theme }) =>
        theme.colors.primary.main.contrastColor};
      color: ${({ theme }) => theme.colors.primary.main.color};
      box-shadow: ${({ theme }) =>
          `${theme.colors.background.main.contrastColor}20`}
        0px 2px 10px 5px;
    }
  }
`;

export default function HomeScreen(): JSX.Element {
  return (
    <main>
      <Head>
        <title>
          WeekLinks a Newsletter do DevSoutinho | Mario Souto - DevSoutinho
        </title>
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
              📰 <strong>WeekLinks DevSoutinho</strong> Receba TODA segunda a
              newsletter do DevSoutinho, 2 min de leitura, sempre 7 dicas legais
              de coisas que mudaram/fizeram minha semana de alguma forma
            </Text>
          </div>
        </header>

        <FormWrapper>
          <div id="mc_embed_signup">
            <form
              action="https://mariosouto.us8.list-manage.com/subscribe/post?u=8225f161ef3ee7a744fd4a2ba&amp;id=2e2754236e"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              className="validate"
              target="_blank"
              noValidate
            >
              <div id="mc_embed_signup_scroll">
                <input
                  type="email"
                  name="EMAIL"
                  className="email inputField"
                  id="mce-EMAIL"
                  placeholder="Seu email aqui"
                  required
                />
                <div
                  style={{ position: 'absolute', left: '-5000px' }}
                  aria-hidden="true"
                >
                  <input
                    type="text"
                    name="b_8225f161ef3ee7a744fd4a2ba_2e2754236e"
                    tabIndex={-1}
                  />
                </div>
                <div className="clear">
                  <button
                    type="submit"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    className="button"
                  >
                    Inscreva-se
                  </button>
                </div>

                <p style={{ fontSize: '12px' }}>
                  Fica tranquilo, eu também não gosto de spam :)
                </p>
              </div>
            </form>
          </div>
        </FormWrapper>
      </div>
    </main>
  );
}
