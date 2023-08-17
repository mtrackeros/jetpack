export type Trigger = {
	slug: string;
	title: string;
	description?: string;
	category: Category;
};

export type Step = {
	attributes: string[];
	nextStep?: Step;
	slug: string;
	title: string;
	description: string;
	type: Type;
	category: Category;
	allowedTriggers: Trigger[];
};

export type Action = Step;

export type Condition = Step;

export type Workflow = {
	id: number;
	name: string;
	description: string;
	category: Category;
	triggers: Trigger[];
<<<<<<< HEAD
	initial_step: Step[];
=======
	initial_step: Step;
>>>>>>> 715734e6bc (Add Bulk Workflow action component)
	active: boolean;
	version: number;
	added: string;
};

export type Type = 'contacts';

export type Category = string;
