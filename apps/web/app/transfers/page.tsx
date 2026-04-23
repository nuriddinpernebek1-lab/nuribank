import { AppShell } from '../../components/layout/app-shell';
import { TransferDemo } from '../../components/transfers/transfer-demo';

export default function TransfersPage() {
  return (
    <AppShell heading="Money transfer flow" subheading="Designed specifically for phones: thumb-friendly inputs, concise confirmations and fast repeat actions.">
      <TransferDemo />
    </AppShell>
  );
}
