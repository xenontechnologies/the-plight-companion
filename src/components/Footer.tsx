import { Link } from "react-router-dom";
import { Heart, MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/1234567890?text=Hi%2C%20I%20need%20someone%20to%20talk%20to";

const Footer = () => (
  <footer className="border-t border-border/60 bg-card/50">
    <div className="container py-12">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero">
              <Heart className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-semibold">The Plight</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A safe space for mental health support. Available 24/7, confidential, and compassionate.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Quick Links</h4>
          <div className="flex flex-col gap-2">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
            <Link to="/chat" className="text-sm text-muted-foreground hover:text-primary transition-colors">Chat Now</Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Reach Out</h4>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </a>
          <p className="mt-3 text-xs text-muted-foreground">
            If you're in crisis, please call your local emergency services or a crisis hotline.
          </p>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-border/60 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} The Plight. All rights reserved. Your privacy matters.
      </div>
    </div>
  </footer>
);

export default Footer;
