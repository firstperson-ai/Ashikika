import { render, screen, fireEvent } from '@testing-library/react';
import ResumeEditor from '../components/resume/ResumeEditor';
import { motion } from 'framer-motion';

describe('ResumeEditor', () => {
  const mockOnOptimize = jest.fn();
  const mockSetResumeData = jest.fn();

  const resumeData = { content: 'Initial resume content' };

  it('renders correctly with initial content', () => {
    render(<ResumeEditor resumeData={resumeData} setResumeData={mockSetResumeData} onOptimize={mockOnOptimize} />);
    expect(screen.getByLabelText(/Edit Your Resume/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Edit Your Resume/i)).toHaveValue('Initial resume content');
  });

  it('updates content on textarea change', () => {
    render(<ResumeEditor resumeData={resumeData} setResumeData={mockSetResumeData} onOptimize={mockOnOptimize} />);
    const textarea = screen.getByLabelText(/Resume Editor/i);
    fireEvent.change(textarea, { target: { value: 'Updated resume content' } });
    expect(mockSetResumeData).toHaveBeenCalledWith({ content: 'Updated resume content' });
  });

  it('calls onOptimize when button is clicked', () => {
    render(<ResumeEditor resumeData={resumeData} setResumeData={mockSetResumeData} onOptimize={mockOnOptimize} />);
    const button = screen.getByLabelText(/Optimize Resume with AI/i);
    fireEvent.click(button);
    expect(mockOnOptimize).toHaveBeenCalled();
  });
});