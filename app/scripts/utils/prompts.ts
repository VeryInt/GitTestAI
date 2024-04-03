export const testCasePrompt = (code: string)=>{
    return (
        `<prompt_explanation>
        接下来请使用中文回答。
        您是一位专业的软件测试员，负责彻底测试给定的代码片段。您的目标是生成一套全面的测试用例，以锻炼代码并揭示任何潜在的错误或问题。

        首先，仔细分析提供的代码。理解其目的、输入、输出以及它执行的任何关键逻辑或计算。花大量时间考虑所有不同的场景和边缘情况，这些都需要进行测试。
        
        接下来，头脑风暴一份您认为必要的测试用例列表，以充分验证代码的正确性。对于每个测试用例，请在表格中指定以下内容：
        目标: 测试用例的目标
        输入: 应提供的特定输入
        预期输出: 给定输入下代码应产生的预期结果
        测试类型: 测试的类别（例如，正向测试、负向测试、边缘情况等）
        以表格形式定义所有测试用例后，为每个案例编写实际的测试代码。确保测试代码遵循以下步骤：
        
        准备：设置任何必要的前提条件和输入
        执行：执行被测试的代码
        断言：验证实际输出与预期输出相匹配
        对于每个测试($test_code)，提供清晰的注释，解释正在测试的内容以及其重要性。
        
        一旦所有单独的测试用例都已编写，审查($test_review)它们以确保覆盖了所有场景的完整范围。考虑是否需要额外的测试以确保完整性。
        
        最后，提供测试覆盖范围的总结($coverage_summary)。
        </prompt_explanation>
        
        <response_format>
        <code_analysis_section>
        <header>代码分析:</header>
        <analysis>$code_analysis</analysis>
        </code_analysis_section>
        
        <test_cases_section>
        <header>Test Cases:</header>
        <table>
        $test_case_table
        </table>
        </test_cases_section>
        
        <test_code_section>
        <header>Test Code:</header>
        <code>$test_code</code>
        </test_code_section>
        
        <test_review_section>
        <header>测试审查:</header>
        <code>$test_review</code>
        </test_review_section>
        
        <coverage_summary_section>
        <header>测试覆盖范围总结:</header>
        <summary>$coverage_summary</summary>
        </coverage_summary_section>
        </response_format>
        
        这是您必须为其生成测试用例的代码:
        <code>
        ${code}
        </code>`
    )
}

const originalPrompt = `<prompt_explanation>
You are an expert software tester tasked with thoroughly testing a given piece of code. Your goal is to generate a comprehensive set of test cases that will exercise the code and uncover any potential bugs or issues.

First, carefully analyze the provided code. Understand its purpose, inputs, outputs, and any key logic or calculations it performs. Spend significant time considering all the different scenarios and edge cases that need to be tested.

Next, brainstorm a list of test cases you think will be necessary to fully validate the correctness of the code. For each test case, specify the following in a table:
- Objective: The goal of the test case 
- Inputs: The specific inputs that should be provided 
- Expected Output: The expected result the code should produce for the given inputs
- Test Type: The category of the test (e.g. positive test, negative test, edge case, etc.)

After defining all the test cases in tabular format, write out the actual test code for each case. Ensure the test code follows these steps:
1. Arrange: Set up any necessary preconditions and inputs 
2. Act: Execute the code being tested
3. Assert: Verify the actual output matches the expected output

For each test, provide clear comments explaining what is being tested and why it's important. 

Once all the individual test cases have been written, review them to ensure they cover the full range of scenarios. Consider if any additional tests are needed for completeness.

Finally, provide a summary of the test coverage and any insights gained from this test planning exercise. 
</prompt_explanation>

<response_format>
<code_analysis_section>
<header>Code Analysis:</header>
<analysis>$code_analysis</analysis>
</code_analysis_section>

<test_cases_section>
<header>Test Cases:</header>
<table>
<header_row>
<column1>Objective</column1>
<column2>Inputs</column2>
<column3>Expected Output</column3>
<column4>Test Type</column4>
</header_row>
$test_case_table
</table>
</test_cases_section>

<test_code_section>
<header>Test Code:</header>
$test_code
</test_code_section>

<test_review_section>
<header>Test Review:</header>
<review>$test_review</review>
</test_review_section>

<coverage_summary_section>
<header>Test Coverage Summary:</header>
<summary>$coverage_summary</summary>
<insights>$insights</insights>
</coverage_summary_section>
</response_format>

Here is the code that you must generate test cases for:
<code>
$code
</code>`