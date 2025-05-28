import React, { useState, useEffect, useRef } from 'react';
import { Send, Shield, Eye, EyeOff, RefreshCw, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import emailjs from '@emailjs/browser';
const EMAILJS_SERVICE_ID = "service_bamrnzi"
const EMAILJS_TEMPLATE_ID = "template_ubbuz4t"
const EMAILJS_PUBLIC_KEY = "pTc-nIZVSpKH57VB9"
// Advanced Anti-Bot Captcha Component
const AdvancedCaptcha: React.FC<{
  onVerify: (isVerified: boolean) => void;
  reset?: boolean;
}> = ({ onVerify, reset }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [difficulty, setDifficulty] = useState(1);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Exclude similar looking chars
    let text = '';
    for (let i = 0; i < 5 + difficulty; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(text);
    drawCaptcha(text);
  };
useEffect(() => {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}, []);
  const drawCaptcha = (text: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background with noise
    ctx.fillStyle = '#1a1a1a'; // dark-800
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add noise dots
    for (let i = 0; i < 50 + difficulty * 20; i++) {
      ctx.fillStyle = `rgba(156, 163, 175, ${Math.random() * 0.3})`;
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
    }

    // Draw distraction lines
    for (let i = 0; i < 3 + difficulty; i++) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(99, 102, 241, ${Math.random() * 0.3})`;
      ctx.lineWidth = 1;
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // Draw text with distortion
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const x = (canvas.width / (text.length + 1)) * (i + 1);
      const y = canvas.height / 2 + (Math.random() - 0.5) * 10;
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((Math.random() - 0.5) * 0.5);
      ctx.fillStyle = '#e5e7eb'; // gray-200
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }
  };

  const verifyCaptcha = () => {
    const isCorrect = userInput.toUpperCase() === captchaText;
    setIsVerified(isCorrect);
    
    if (isCorrect) {
      onVerify(true);
    } else {
      setAttempts(prev => prev + 1);
      if (attempts >= 2) {
        setDifficulty(prev => Math.min(prev + 1, 3));
      }
      generateCaptcha();
      setUserInput('');
      onVerify(false);
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, [difficulty]);

  useEffect(() => {
    if (reset) {
      setUserInput('');
      setIsVerified(false);
      setAttempts(0);
      setDifficulty(1);
      generateCaptcha();
    }
  }, [reset]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Shield className="w-4 h-4 text-primary-500" />
        <span className="text-sm font-medium">Security Verification</span>
        {attempts > 0 && (
          <span className="text-xs text-yellow-400">
            ({attempts} failed attempt{attempts > 1 ? 's' : ''})
          </span>
        )}
      </div>
      
      <div className="flex gap-4 items-center">
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={200}
            height={60}
            className="border border-dark-600 rounded-lg bg-dark-800"
          />
          <button
            type="button"
            onClick={generateCaptcha}
            className="absolute -top-2 -right-2 p-1 bg-dark-700 hover:bg-dark-600 rounded-full transition-colors"
            title="Refresh captcha"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>
        
        <div className="flex-1">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter the code"
            className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            maxLength={captchaText.length}
          />
          <button
            type="button"
            onClick={verifyCaptcha}
            disabled={userInput.length !== captchaText.length}
            className="mt-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-dark-600 disabled:cursor-not-allowed rounded-lg text-sm transition-colors"
          >
            Verify
          </button>
        </div>
        
        {isVerified && (
          <CheckCircle className="w-6 h-6 text-green-500" />
        )}
      </div>
    </div>
  );
};

// Honeypot and Timing Anti-Spam Component
const AntiSpamProtection: React.FC<{
  onValidation: (isValid: boolean) => void;
  formStartTime: number;
}> = ({ onValidation, formStartTime }) => {
  const [honeypotValue, setHoneypotValue] = useState('');
  const [timingValid, setTimingValid] = useState(false);
  const [behaviorScore, setBehaviorScore] = useState(0);

  useEffect(() => {
    // Check timing (minimum 5 seconds to fill form)
    const currentTime = Date.now();
    const timeTaken = currentTime - formStartTime;
    const isTimingValid = timeTaken > 5000 && timeTaken < 600000; // 5s to 10m
    setTimingValid(isTimingValid);

    // Validate all anti-spam measures
    const isValid = honeypotValue === '' && isTimingValid && behaviorScore > 3;
    onValidation(isValid);
  }, [honeypotValue, formStartTime, behaviorScore, onValidation]);

  // Track user behavior for bot detection
  useEffect(() => {
    let score = 0;
    
    // Mouse movement detection
    const handleMouseMove = () => {
      score += 0.1;
      setBehaviorScore(Math.min(score, 5));
    };

    // Keyboard interaction detection
    const handleKeyDown = () => {
      score += 0.2;
      setBehaviorScore(Math.min(score, 5));
    };

    // Focus/blur detection
    const handleFocus = () => {
      score += 0.3;
      setBehaviorScore(Math.min(score, 5));
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', handleFocus);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', handleFocus);
    };
  }, []);

  return (
    <>
      {/* Honeypot field - hidden from users */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <input
          type="text"
          name="website"
          value={honeypotValue}
          onChange={(e) => setHoneypotValue(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      
      {/* Security status indicator */}
      <div className="flex items-center gap-2 text-xs text-dark-300">
        <Shield className="w-3 h-3" />
        <span>Security checks: </span>
        <span className={timingValid ? 'text-green-500' : 'text-yellow-500'}>
          Timing {timingValid ? '✓' : '⏳'}
        </span>
        <span className={behaviorScore > 3 ? 'text-green-500' : 'text-yellow-500'}>
          Behavior {behaviorScore > 3 ? '✓' : '⏳'}
        </span>
      </div>
    </>
  );
};

// Main Contact Form Component
const AdvancedContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'normal',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [antiSpamValid, setAntiSpamValid] = useState(false);
  const [formStartTime] = useState(Date.now());
  const [resetCaptcha, setResetCaptcha] = useState(false);
  const [showAdvancedFields, setShowAdvancedFields] = useState(false);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim() || formData.subject.length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters long';
    }

    if (!formData.message.trim() || formData.message.length < 20) {
      newErrors.message = 'Message must be at least 20 characters long';
    }

    if (!captchaVerified) {
      newErrors.captcha = 'Please complete the security verification';
    }

    if (!antiSpamValid) {
      newErrors.antispam = 'Please wait a moment before submitting';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }

  setIsSubmitting(true);
  setSubmitStatus('idle');



  try {
    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      priority: formData.priority,
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    setSubmitStatus('success');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: 'NORMAL',
    });
    setCaptchaVerified(false);
    setResetCaptcha(true);
    setTimeout(() => setResetCaptcha(false), 100);
    
  } catch (error) {
    console.error('Email send failed:', error);
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-dark-700 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
              errors.name ? 'border-red-500' : 'border-dark-600'
            }`}
            placeholder="Your full name"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-dark-700 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
              errors.email ? 'border-red-500' : 'border-dark-600'
            }`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-2">
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 bg-dark-700 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
            errors.subject ? 'border-red-500' : 'border-dark-600'
          }`}
          placeholder="Subject of your email"
        />
        {errors.subject && (
          <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.subject}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="priority" className="block text-sm font-medium mb-2">
          Priority Level
        </label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="NORMAL">Normal</option>
          <option value="URGENT">Urgent (48h response)</option>
          <option value="ASAP">ASAP (Same day response)</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 bg-dark-700 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none ${
            errors.message ? 'border-red-500' : 'border-dark-600'
          }`}
          placeholder="Message of your email"
        />
        <div className="flex justify-between items-center mt-1">
          {errors.message ? (
            <p className="text-red-400 text-sm flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.message}
            </p>
          ) : (
            <p className="text-dark-400 text-sm">
              {formData.message.length}/1000 characters
            </p>
          )}
        </div>
      </div>

      {/* Security Verification */}
      <div className="bg-dark-800 p-6 rounded-lg border border-dark-600">
        <AdvancedCaptcha 
          onVerify={setCaptchaVerified}
          reset={resetCaptcha}
        />
        {errors.captcha && (
          <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.captcha}
          </p>
        )}
      </div>

      {/* Anti-Spam Protection */}
      <AntiSpamProtection 
        onValidation={setAntiSpamValid}
        formStartTime={formStartTime}
      />
      
      {errors.antispam && (
        <p className="text-red-400 text-sm flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {errors.antispam}
        </p>
      )}

      {/* Submit Status */}
      {submitStatus === 'success' && (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Message sent successfully!</span>
          </div>
          <p className="text-green-300 text-sm mt-1">
            Thank you for reaching out. I'll get back to you within 48 hours.
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-400">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Failed to send message</span>
          </div>
          <p className="text-red-300 text-sm mt-1">
            Please try again or contact me directly via email.
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || !captchaVerified || !antiSpamValid}
        className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-dark-600 disabled:cursor-not-allowed text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <span>Send Message</span>
          </>
        )}
      </button>

      {/* Security Notice */}
      <div className="text-center text-xs text-dark-400">
        <p>🔒 Your information is secure and will never be shared with third parties.</p>
      </div>
    </form>
  );
};

export default AdvancedContactForm;