import { openai } from '@ai-sdk/openai';
import { generateText, tool, stepCountIs } from 'ai';
import { z } from 'zod';

const model = openai('gpt-4o');

/**
 * Exercise: Tool Calling with Vercel AI SDK
 */

// Simple in-memory data (pretend these came from a DB):
const PRICE_TABLE = {
  milk: 1.59,
  bread: 2.49,
  eggs: 3.29,
  apple: 0.89,
  banana: 0.59,
};

async function main() {
  console.log('=== Running Exercise 1: Single Tool Call ===');
  await singleToolCallExercise();

  console.log('\n=== Running Exercise 2: Multiple Tool Calls ===');
  await multipleToolCallsExercise();

  console.log('\n=== Running Exercise 3: Auto-Loop + Summary with stopWhen ===');
  await summarizeWithStopWhenExercise();
}

main().catch(console.error);

// -----------------------------------------------------
// 1) SINGLE TOOL CALL
// -----------------------------------------------------
async function singleToolCallExercise() {
  // A: Define the tool with Zod schema
  const priceLookup = tool({
    description: 'Return the price in USD for a grocery item.',
    parameters: z.object({
      item: z.string().describe('The name of the grocery item to check'),
    }),
    execute: async ({ item }) => {
      const normalizedItem = item.toLowerCase().trim();
      const price = PRICE_TABLE[normalizedItem] ?? null;
      return { item, price };
    },
  });

  // B & C: Pass tool and prompt to generateText
  const result = await generateText({
    model,
    tools: {
      priceLookup,
    },
    prompt: 'How much does milk cost?',
  });

  // D: Inspect what came back
  console.log('--- Tool Calls ---');
  console.log(JSON.stringify(result.toolCalls, null, 2));
  console.log('--- Tool Results ---');
  console.log(JSON.stringify(result.toolResults, null, 2));

  console.log('\n--- Final Text ---');
  console.log(result.text);
}

// -----------------------------------------------------
// 2) MULTIPLE TOOL CALLS
// -----------------------------------------------------
async function multipleToolCallsExercise() {
  const priceLookup = tool({
    description: 'Return the price in USD for a grocery item.',
    parameters: z.object({
      item: z.string().describe('The name of the grocery item'),
    }),
    execute: async ({ item }) => ({
      item,
      price: PRICE_TABLE[item.toLowerCase().trim()] ?? null,
    }),
  });

  // B: Define deliveryEta tool with input: { address: string }
  const deliveryEta = tool({
    description: 'Estimate delivery time in minutes to a given address.',
    parameters: z.object({
      address: z.string().describe('The delivery destination address'),
    }),
    execute: async ({ address }) => {
      const eta = 20 + Math.floor(Math.random() * 21); // 20–40 min
      return { address, etaMinutes: eta };
    },
  });

  // C: Call with prompt requesting both prices and ETA
  const result = await generateText({
    model,
    tools: { priceLookup, deliveryEta },
    prompt:
      'How much do milk and bread cost, and how long to deliver to 221B Baker Street?',
  });

  // D: Inspect tool calls/results
  console.log('--- Tool Calls ---');
  console.log(JSON.stringify(result.toolCalls, null, 2));
  console.log('--- Tool Results ---');
  console.log(JSON.stringify(result.toolResults, null, 2));

  console.log('\n--- Final Text ---');
  console.log(result.text);
}

// -----------------------------------------------------
// 3) AUTO-LOOP + SUMMARY WITH stopWhen
// -----------------------------------------------------
async function summarizeWithStopWhenExercise() {
  const NUMBER_OF_STEPS = 3;

  // A: Define both tools
  const priceLookup = tool({
    description: 'Return the price in USD for a grocery item.',
    parameters: z.object({
      item: z.string().describe('The name of the grocery item'),
    }),
    execute: async ({ item }) => ({
      item,
      price: PRICE_TABLE[item.toLowerCase().trim()] ?? null,
    }),
  });

  const deliveryEta = tool({
    description: 'Estimate delivery time in minutes to a given address.',
    parameters: z.object({
      address: z.string().describe('The delivery destination address'),
    }),
    execute: async ({ address }) => {
      const eta = 20 + Math.floor(Math.random() * 21);
      return { address, etaMinutes: eta };
    },
  });

  // B: Use stopWhen with stepCountIs to allow multi-step tool loops
  const result = await generateText({
    model,
    tools: { priceLookup, deliveryEta },
    stopWhen: stepCountIs(NUMBER_OF_STEPS),
    prompt:
      'I want to buy eggs and a banana. Use tools to check prices and tell me the total cost, then estimate delivery time to 221B Baker Street.',
  });

  // C: Inspect all intermediate steps and final output
  console.log('--- ALL STEPS (auto-loop) ---');
  console.log(
    JSON.stringify(
      result.steps.map((s, i) => ({
        step: i + 1,
        toolCalls: s.toolCalls,
        toolResults: s.toolResults,
        text: s.text,
      })),
      null,
      2
    )
  );

  console.log('\n--- Final Summary ---');
  console.log(result.text);
}