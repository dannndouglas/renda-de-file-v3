import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { PublicLayout } from '@/components/layouts/PublicLayout';

export const metadata: Metadata = {
  title: 'Contato | Renda de Filé',
  description: 'Entre em contato com a Renda de Filé. Conheça nossa história, faça parcerias ou tire suas dúvidas sobre nossos produtos artesanais.',
};

export default function ContatoPage() {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Fale Conosco
              </h1>
              <p className="text-lg text-gray-600">
                Queremos ouvir você! Entre em contato para conhecer mais sobre a Renda de Filé,
                fazer parcerias ou esclarecer dúvidas sobre nossos produtos.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div>
                <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Envie sua mensagem
                  </h2>
                  <ContactForm />
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <ContactInfo />

                {/* Map Section */}
                <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Nossa Localização
                  </h3>
                  <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.3576910371564!2d-38.55869602503635!3d-3.731673196252371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c749af19a7e3f7%3A0x4ac7c0a88dcc55cd!2sCentro%20de%20Turismo%20do%20Cear%C3%A1!5e0!3m2!1spt-BR!2sbr!4v1704842421987!5m2!1spt-BR!2sbr"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Localização da Renda de Filé"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    Centro de Turismo do Ceará (EMCETUR) - Fortaleza, CE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}