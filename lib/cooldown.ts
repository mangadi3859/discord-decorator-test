const cooldown = new Map<string, number>();

export function addCooldown(key: string, duration: number): void {
    if (!duration || duration < 1) return;

    cooldown.set(key, Date.now() + duration);
    setTimeout(() => cooldown.delete(key), duration);
}

export function getCooldown(key: string): number {
    return <number>cooldown.get(key);
}
