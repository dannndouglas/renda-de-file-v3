'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface NewsletterSignupProps {
  variant?: 'default' | 'inline' | 'minimal';
  className?: string;
}

export function NewsletterSignup({ 
  variant = 'default', 
  className = '' 
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Por favor, insira seu email');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/v1/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, nome }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubscribed(true);
        setEmail('');
        setNome('');
        toast.success(data.message);
      } else {
        toast.error(data.error || 'Erro ao inscrever no newsletter');
      }
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Erro ao processar inscrição');
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === 'minimal') {
    return (
      <div className={`flex gap-2 ${className}`}>
        <Input
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          disabled={isLoading || isSubscribed}
        />
        <Button 
          onClick={handleSubmit}
          disabled={isLoading || isSubscribed || !email}
          size="sm"
        >
          {isLoading ? (
            'Inscrevendo...'
          ) : isSubscribed ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            'Inscrever'
          )}
        </Button>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`bg-amber-50 p-6 rounded-lg border border-amber-200 ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-6 h-6 text-amber-600" />
          <div>
            <h3 className="font-semibold text-amber-900">
              Newsletter da Renda de Filé
            </h3>
            <p className="text-sm text-amber-700">
              Receba novidades sobre produtos e eventos
            </p>
          </div>
        </div>
        
        {isSubscribed ? (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Inscrito com sucesso!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                type="text"
                placeholder="Seu nome (opcional)"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                disabled={isLoading}
              />
              <Input
                type="email"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading || !email}
              className="w-full bg-amber-600 hover:bg-amber-700"
            >
              {isLoading ? 'Inscrevendo...' : 'Inscrever no Newsletter'}
            </Button>
          </form>
        )}
      </div>
    );
  }

  // Default variant - card completo
  return (
    <Card className={className}>
      <CardHeader className="text-center">
        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6 text-amber-600" />
        </div>
        <CardTitle className="text-amber-900">
          Newsletter da Renda de Filé
        </CardTitle>
        <p className="text-amber-700">
          Receba as últimas novidades sobre produtos artesanais, eventos especiais e histórias da tradição da Renda de Filé diretamente no seu email.
        </p>
      </CardHeader>
      
      <CardContent>
        {isSubscribed ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-green-900 mb-2">
              Inscrito com sucesso!
            </h3>
            <p className="text-green-700 text-sm">
              Você receberá nossas novidades em breve. Obrigado por apoiar a tradição da Renda de Filé!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Seu nome (opcional)"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              disabled={isLoading}
            />
            <Input
              type="email"
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading || !email}
              className="w-full bg-amber-600 hover:bg-amber-700"
            >
              {isLoading ? 'Inscrevendo...' : 'Inscrever no Newsletter'}
            </Button>
            <p className="text-xs text-gray-500 text-center">
              Respeitamos sua privacidade. Cancele a inscrição a qualquer momento.
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  );
}