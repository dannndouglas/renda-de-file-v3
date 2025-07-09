import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ContactInfo() {
  const contactDetails = [
    {
      icon: MapPin,
      title: 'Endereço',
      content: [
        'Centro de Turismo do Ceará (EMCETUR)',
        'Rua Senador Pompeu, 350 - Centro',
        'Fortaleza - CE, 60025-000',
      ],
    },
    {
      icon: Phone,
      title: 'Telefones',
      content: ['(85) 3101-1622', '(85) 98765-4321'],
    },
    {
      icon: Mail,
      title: 'Email',
      content: ['contato@rendadefile.org.br', 'associacao@rendadefile.org.br'],
    },
    {
      icon: Clock,
      title: 'Horário de Funcionamento',
      content: [
        'Segunda a Sexta: 8h às 18h',
        'Sábado: 8h às 13h',
        'Domingo: Fechado',
      ],
    },
  ];

  const whatsappNumber = '5585987654321';
  const whatsappMessage = encodeURIComponent(
    'Olá! Vi o site da Renda de Filé e gostaria de mais informações.'
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Informações de Contato
        </h2>
        <div className="space-y-6">
          {contactDetails.map((detail, index) => {
            const Icon = detail.icon;
            return (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="rounded-lg bg-amber-100 p-3">
                    <Icon className="h-6 w-6 text-amber-900" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">
                    {detail.title}
                  </h3>
                  <div className="space-y-1">
                    {detail.content.map((line, lineIndex) => (
                      <p key={lineIndex} className="text-gray-600">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* WhatsApp CTA */}
      <div className="rounded-lg border border-green-200 bg-green-50 p-6">
        <h3 className="mb-3 flex items-center gap-2 font-semibold text-gray-900">
          <MessageCircle className="h-5 w-5 text-green-600" />
          Atendimento via WhatsApp
        </h3>
        <p className="mb-4 text-gray-600">
          Prefere conversar pelo WhatsApp? Clique no botão abaixo para iniciar
          uma conversa.
        </p>
        <Button
          asChild
          className="w-full bg-green-600 text-white hover:bg-green-700"
        >
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Conversar no WhatsApp
          </a>
        </Button>
      </div>

      {/* Social Links */}
      <div className="border-t pt-6">
        <h3 className="mb-4 font-semibold text-gray-900">
          Siga-nos nas redes sociais
        </h3>
        <div className="flex gap-4">
          <a
            href="https://www.instagram.com/rendadefile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 transition-colors hover:text-orange-500"
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/rendadefile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 transition-colors hover:text-orange-500"
          >
            Facebook
          </a>
          <a
            href="https://www.youtube.com/@rendadefile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 transition-colors hover:text-orange-500"
          >
            YouTube
          </a>
        </div>
      </div>
    </div>
  );
}
