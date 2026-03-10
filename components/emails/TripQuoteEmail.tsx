import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface TripQuoteEmailProps {
  customerName: string;
  destinations: string;
  duration: string;
  aiGeneratedQuote: string;
}

export const TripQuoteEmail = ({
  customerName = "Traveler",
  destinations = "Northeast India",
  duration = "a few days",
  aiGeneratedQuote = "Your itinerary is being prepared.",
}: TripQuoteEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your Custom TripNE Itinerary is Ready!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>TRIP<span style={{ color: "#3b82f6" }}>NE</span></Text>
          </Section>
          
          <Heading style={h1}>Your Custom Itinerary to {destinations}</Heading>
          
          <Text style={text}>Hi {customerName},</Text>
          <Text style={text}>
            Thank you for exploring the Eight Jewels with TripNE. Our elite AI concierge has analyzed your request for a {duration} journey and designed the following personalized itinerary and estimated quote just for you.
          </Text>

          <Hr style={hr} />
          
          <Section style={quoteSection}>
            <div dangerouslySetInnerHTML={{ __html: aiGeneratedQuote }} />
          </Section>

          <Hr style={hr} />

          <Text style={text}>
            This is a preliminary estimate to help you map out your adventure. If you're ready to proceed, simply reply to this email, and our human agents will secure your bookings!
          </Text>
          
          <Text style={footer}>
            Wander More, Spend Less. <br />
            © {new Date().getFullYear()} TripNE. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default TripQuoteEmail;

// Inline Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '8px',
  border: '1px solid #e6ebf1',
  maxWidth: '600px',
};

const header = {
  padding: '32px 48px',
  backgroundColor: '#09090b', // zinc-950
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
  textAlign: 'center' as const,
};

const logo = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
  letterSpacing: '-1px',
  margin: '0',
};

const h1 = {
  color: '#09090b',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '30px 48px 10px',
  padding: '0',
};

const text = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 48px 16px',
};

const quoteSection = {
  margin: '20px 48px',
  padding: '20px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  color: '#334155',
  fontSize: '15px',
  lineHeight: '24px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '40px 48px 0',
};
