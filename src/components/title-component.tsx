import { Typography } from 'antd';
import React, { FC } from 'react';

const { Title } = Typography;

/**
 * This is a component that renders the title for the application
 */
export const TitleComponent: FC = () => {
  return (
    <>
      <div
        style={{
          background: 'transparent',
          padding: '10px 16px',
          position: 'absolute',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Title
            level={2}
            style={{
              color: '#fff',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontWeight: 'bold',
              fontSize: '2em',
              textShadow: '2px 2px 0px #333',
              transform: 'skew(-10deg)',
              marginRight: '20px',
              width: '100%',
            }}
          >
            SPRINTVISION
            <span
              style={{
                marginLeft: '-5px',
                textShadow: '2px 2px 0px #333',
              }}
            />
          </Title>
        </div>
      </div>
    </>
  );
};
