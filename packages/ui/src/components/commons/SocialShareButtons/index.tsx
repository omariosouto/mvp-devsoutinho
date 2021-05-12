import React from 'react';
import styled from 'styled-components';

const List = styled.ul``;
const ListItem = styled.li``;

interface SocialShareProvider {
  shareUrl: string;
  display: string | JSX.Element;
}
const socialShareMap: Record<string, SocialShareProvider> = {
  facebook: {
    shareUrl: 'https://www.facebook.com/sharer/sharer.php?u=',
    display: 'Facebook',
  },
  twitter: {
    shareUrl: 'https://twitter.com/intent/tweet?text=',
    display: 'Twitter',
  },
};

interface SocialShareButtonsProps {
  url: string;
}
export function SocialShareButtons({
  url,
}: SocialShareButtonsProps): JSX.Element {
  return (
    <List>
      {Object.entries(socialShareMap).map(
        ([socialShareItemKey, socialShareProvider]) => (
          <ListItem key={socialShareItemKey}>
            <a href={`${socialShareProvider.shareUrl}${url}`}>
              {socialShareProvider.display}
            </a>
          </ListItem>
        )
      )}
    </List>
  );
}
