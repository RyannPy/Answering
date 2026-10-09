// Sample worksheet with mathematical notation
// For testing and demonstration of LaTeX rendering

export const mathWorksheetText = `@worksheet
 title: Calculus and Algebra Practice
 description: Mathematical questions with LaTeX notation

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
 question: Which of the following are solutions to \\((x^2+1)^2-7(x^2+1)+10<0\\)?
 options:
  - \\(x = 0\\)
  - \\(x = 1.5\\)
  - \\(x = -1.5\\)
  - \\(x = 3\\)
 answer: 2,3
 explanation: Let \\(u = x^2 + 1\\). Then \\(u^2 - 7u + 10 < 0\\) factors as \\((u-2)(u-5) < 0\\), so \\(2 < u < 5\\). This means \\(2 < x^2 + 1 < 5\\), giving \\(1 < x^2 < 4\\), or \\(x \\in (-2, -1) \\cup (1, 2)\\).
@end

@question
 type: short
 question: What is the quadratic formula for solving \\(ax^2 + bx + c = 0\\)?
 answer:
  - \\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\)
  - x = (-b ± sqrt(b^2 - 4ac))/(2a)
 explanation: The quadratic formula is \\[x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\] where \\(a \\neq 0\\).
@end

@question
 type: tf
 question: The function \\(f(x) = x^2\\) is increasing on the interval \\((0, \\infty)\\).
 answer: true
 explanation: The derivative \\(f'(x) = 2x\\) is positive for all \\(x > 0\\), so \\(f(x)\\) is increasing on \\((0, \\infty)\\).
@end

@question
 type: mc
 question: Evaluate the limit: \\[\\lim_{x \\to 0} \\frac{\\sin(x)}{x}\\]
 options:
  - 0
  - 1
  - \\(\\infty\\)
  - undefined
 answer: 2
 explanation: This is a standard limit: \\(\\lim_{x \\to 0} \\frac{\\sin(x)}{x} = 1\\).
@end

@question
 type: multi
 question: Which of the following are correct summation formulas?
 options:
  - \\(\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}\\)
  - \\(\\sum_{i=1}^{n} i^2 = \\frac{n(n+1)(2n+1)}{6}\\)
  - \\(\\sum_{i=1}^{n} i^3 = \\left(\\frac{n(n+1)}{2}\\right)^2\\)
  - \\(\\sum_{i=1}^{n} 2^i = 2^{n+1} - 2\\)
 answer: 1,2,3,4
 explanation: All four formulas are standard summation identities used in discrete mathematics and calculus.
@end

@question
 type: tf
 question: In propositional logic, \\(\\alpha \\land \\beta \\implies \\alpha\\) is a tautology.
 answer: true
 explanation: If both \\(\\alpha\\) and \\(\\beta\\) are true, then \\(\\alpha\\) must be true. This is always valid by the definition of logical conjunction.
@end

@question
 type: mc
 question: What is the integral \\(\\int x^2 \\, dx\\)?
 options:
  - \\(\\frac{x^3}{3} + C\\)
  - \\(2x + C\\)
  - \\(x^3 + C\\)
  - \\(\\frac{x^2}{2} + C\\)
 answer: 1
 explanation: Using the power rule for integration: \\(\\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C\\), we get \\(\\int x^2 \\, dx = \\frac{x^3}{3} + C\\).
@end
`;
