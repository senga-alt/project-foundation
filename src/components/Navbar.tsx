import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Copy, LogOut, Check, User } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MOCK_ADDRESSES } from '@/data/mock';

interface NavbarProps {
  walletConnected: boolean;
  onToggleWallet: () => void;
}

export function Navbar({ walletConnected, onToggleWallet }: NavbarProps) {
  const [copied, setCopied] = useState(false);
  const mockAddress = MOCK_ADDRESSES[0];
  const truncated = `${mockAddress.slice(0, 5)}…${mockAddress.slice(-4)}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(mockAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-[length:var(--text-lg)] font-bold text-foreground">
            Stack<span className="text-primary">Flow</span>
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-6">
          <Link
            to="/"
            className="text-[length:var(--text-sm)] text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <Link
            to="/feed"
            className="text-[length:var(--text-sm)] text-muted-foreground hover:text-foreground transition-colors"
          >
            Activity
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {walletConnected ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 font-mono text-[length:var(--text-xs)]">
                  <Wallet className="h-3.5 w-3.5" />
                  {truncated}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleCopy} className="gap-2">
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Copied!' : 'Copy address'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onToggleWallet} className="gap-2 text-destructive">
                  <LogOut className="h-3.5 w-3.5" />
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" onClick={onToggleWallet} className="gap-2">
              <Wallet className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Connect wallet</span>
              <span className="sm:hidden">Connect</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
