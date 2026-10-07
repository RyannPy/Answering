// Sample worksheet for development/testing
// Based on Answering Worksheet Format v1

export const sampleWorksheetText = `@worksheet
 title: Discrete Mathematics Practice
 description: Mixed question types covering logic, functions, and counting principles

@question
 type: mc
 question: What is the negation of p → q?
 options:
  - ¬p ∧ q
  - p ∧ ¬q
  - p ∨ ¬q
  - ¬p ∨ q
 answer: 2
 explanation: The implication p → q is false only when p is true and q is false, which is represented by p ∧ ¬q.
@end

@question
 type: multi
 question: Which of the following are properties of a bijective function?
 options:
  - It is injective (one-to-one)
  - It is surjective (onto)
  - It has an inverse function
  - Every element in the domain maps to multiple elements in the codomain
 answer: 1,2,3
 explanation: A bijective function is both injective and surjective, which guarantees the existence of an inverse function.
@end

@question
 type: tf
 question: The pigeonhole principle states that if n items are placed into m containers and n > m, then at least one container must contain more than one item.
 answer: true
 explanation: This is the fundamental statement of the pigeonhole principle.
@end

@question
 type: short
 question: What is another term for a one-to-one function?
 answer:
  - injective
  - injection
  - one-to-one
 explanation: All three terms refer to the same concept where each element of the domain maps to a unique element in the codomain.
@end

@question
 type: mc
 question: How many ways can you arrange 5 distinct books on a shelf?
 options:
  - 25
  - 120
  - 60
  - 720
 answer: 2
 explanation: This is 5! (5 factorial) = 5 × 4 × 3 × 2 × 1 = 120.
@end

@question
 type: tf
 question: In propositional logic, the expression (p ∧ q) ∨ (¬p ∧ ¬q) is a tautology.
 answer: false
 explanation: This is not a tautology. It is true only when both p and q have the same truth value.
@end
`;
