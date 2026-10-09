// Sample worksheet for development/testing
// Based on Answering Worksheet Format v1

export const sampleWorksheetText = `@worksheet
 title: Mathematics and Logic Practice
 description: Mixed question types with mathematical notation

@question
 type: mc
 question: What is \\(f(x)\\) when \\(f(x) = \\sqrt{x^2 + 4}\\) and \\(x = 3\\)?
 options:
  - \\(\\sqrt{13}\\)
  - \\(\\sqrt{10}\\)
  - 5
  - 7
 answer: 1
 explanation: Substitute \\(x = 3\\) into \\(f(x) = \\sqrt{x^2 + 4}\\) to get \\(f(3) = \\sqrt{9 + 4} = \\sqrt{13}\\).
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
 question: The function \\(f(x) = x^2\\) is increasing on the interval \\((0, \\infty)\\).
 answer: true
 explanation: The derivative \\(f'(x) = 2x\\) is positive for all \\(x > 0\\), so the function is increasing on \\((0, \\infty)\\).
@end

@question
 type: short
 question: Tentukan himpunan penyelesaian dari \\[\\frac{3x-2}{x-3} \\geq 0\\] Tuliskan jawaban dalam notasi interval (gunakan gabungan ∪ bila perlu).
 answer:
  - \\((-\\infty, \\frac{2}{3}] \\cup (3, \\infty)\\)
  - (-∞, 2/3] ∪ (3, ∞)
  - \\((-\\infty, \\frac{2}{3}] \\cup (3, +\\infty)\\)
  - (-\\infty, 2/3] \\cup (3, \\infty)
  - \\((-\\infty, \\frac{2}{3}] \\cup (3, +\\infty)\\)
  - (-∞,2/3] ∪ (3,∞)
 explanation: Titik pemisah adalah \\(x = \\frac{2}{3}\\) (pembilang nol) dan \\(x = 3\\) (penyebut nol). Uji tanda: untuk \\(x < \\frac{2}{3}\\) hasilnya positif, untuk \\(\\frac{2}{3} < x < 3\\) hasilnya negatif, untuk \\(x > 3\\) hasilnya positif. Jadi penyelesaiannya adalah \\((-\\infty, \\frac{2}{3}] \\cup (3, \\infty)\\).
@end

@question
 type: mc
 question: Solve the inequality \\((x^2+1)^2-7(x^2+1)+10<0\\). Let \\(u = x^2 + 1\\).
 options:
  - \\(x \\in (-2, -1) \\cup (1, 2)\\)
  - \\(x \\in [-2, 2]\\)
  - \\(x \\in (-\\infty, -2) \\cup (2, \\infty)\\)
  - No solution
 answer: 1
 explanation: Substitute \\(u = x^2 + 1\\), solve \\(u^2 - 7u + 10 < 0\\) which factors as \\((u-2)(u-5) < 0\\), giving \\(2 < u < 5\\). Then \\(2 < x^2 + 1 < 5\\) means \\(1 < x^2 < 4\\), so \\(x \\in (-2, -1) \\cup (1, 2)\\).
@end

@question
 type: tf
 question: In propositional logic, the expression \\((p \\land q) \\lor (\\neg p \\land \\neg q)\\) is a tautology.
 answer: false
 explanation: This is not a tautology. It is true only when both \\(p\\) and \\(q\\) have the same truth value.
@end
`;
