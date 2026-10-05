import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('AI English Tutor App', () => {
  it('renders navbar with brand and disabled lesson selector with Reina Elizabeth selected', () => {
    render(<App />);
    expect(screen.getByText('AMI')).toBeInTheDocument();

    const selector = screen.getByRole('combobox') as HTMLSelectElement;
    expect(selector).toBeInTheDocument();
    expect(selector.disabled).toBe(true);
    expect(selector.value).toBe('Reina Elizabeth');
  });

  it('renders lesson tab options in Spanish', () => {
    render(<App />);
    expect(screen.getByText('Ver video')).toBeInTheDocument();
    expect(screen.getByText('Responder preguntas')).toBeInTheDocument();
    expect(screen.getByText('Practicar vocabulario')).toBeInTheDocument();
    expect(screen.getByText('Aprender pronunciación')).toBeInTheDocument();
  });

  it('switches tabs correctly', () => {
    render(<App />);

    // Default tab is video
    expect(screen.getByText('Transcripción Interactiva')).toBeInTheDocument();

    // Click on Quiz tab
    fireEvent.click(screen.getByText('Responder preguntas'));
    expect(screen.getByText(/Pregunta 1 de/i)).toBeInTheDocument();

    // Click on Vocabulary tab
    fireEvent.click(screen.getByText('Practicar vocabulario'));
    expect(screen.getByText('Vocabulario Clave')).toBeInTheDocument();

    // Click on Pronunciation tab
    fireEvent.click(screen.getByText('Aprender pronunciación'));
    expect(screen.getByText(/Selecciona la Frase a Practicar:/i)).toBeInTheDocument();
  });
});
