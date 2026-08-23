import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Fallback title if none provided
    const hasTitle = searchParams.has('title');
    const title = hasTitle 
      ? searchParams.get('title')?.slice(0, 100) 
      : 'dowll - Secure Document Tools';

    // Description
    const hasDesc = searchParams.has('desc');
    const desc = hasDesc
      ? searchParams.get('desc')?.slice(0, 120)
      : 'Convert, compress and manage documents online with dowll. Fast, secure and easy-to-use PDF tools.';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a192f',
            backgroundImage: 'linear-gradient(to bottom right, #001533, #0a192f, #112240)',
            fontFamily: 'sans-serif',
            padding: '80px',
            position: 'relative',
          }}
        >
          {/* Logo / Brand Marker */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '60px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#3b82f6',
              borderRadius: '8px',
              marginRight: '16px',
            }} />
            <span style={{ color: 'white', fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em' }}>
              dowll
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: '100%' }}>
            <h1
              style={{
                fontSize: 72,
                fontWeight: 900,
                color: 'white',
                lineHeight: 1.1,
                marginBottom: 24,
                letterSpacing: '-0.03em',
              }}
            >
              {title}
            </h1>
            
            <p
              style={{
                fontSize: 32,
                color: '#94a3b8',
                maxWidth: '85%',
                lineHeight: 1.4,
                fontWeight: 400,
              }}
            >
              {desc}
            </p>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '12px 24px',
              borderRadius: '100px',
            }}
          >
            <span style={{ color: '#93c5fd', fontSize: 24, fontWeight: 600 }}>dowll.com</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error(e.message);
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
