// Defines types
/** Json literal type */
export type JsonType = string | number | boolean | null | JsonType[] |
	{ [ key: string ]: JsonType };

/** Checks and returns whether a string or buffer contains valid json */
export function testText(text: Buffer | string): boolean {
	// Tests text
	try {
		JSON.parse(text.toString());
		return true;
	}
	catch {
		return false;
	}
}

/** Checks and returns whether a value is valid json */
export function testValue(value: unknown): value is JsonType {
	const stack: any[] = [ value ];
	while(stack.length > 0) {
		const current = stack.pop();
		switch(typeof current) {
			case "boolean":
			case "number":
			case "string": {
				break;
			}
		}
	}
	return true;
}

export function flattenValue(value: object): JsonType {
	return JSON.parse(JSON.stringify(value));
}

export function toText(value: unknown, indent: number = 0): string {
	return JSON.stringify(value, null, indent);
}

export function toJson(text: Buffer | string): JsonType {
	return JSON.parse(text.toString());
}
