export interface IMenuItem
{
	label: string;
	isEnabled?: () => boolean;
	command?: () => void;
	children?: IMenuItem[];
}